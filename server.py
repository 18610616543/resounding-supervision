#!/usr/bin/env python
"""本地开发服务器 — 提供静态文件 + AI API 代理"""

import http.server
import json
import urllib.request
import urllib.error
import os

PORT = 3000
POLLINATIONS_URL = 'https://text.pollinations.ai/openai'

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        """处理 CORS 预检请求"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/chat':
            self._proxy_chat()
        else:
            self.send_error(404, 'Not Found')

    def _proxy_chat(self):
        """将聊天请求代理转发到 Pollinations.ai"""
        try:
            # 读取请求体
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)

            # 转发到 Pollinations
            req = urllib.request.Request(
                POLLINATIONS_URL,
                body,
                {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
                }
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(data)
        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(e.read())
        except Exception as e:
            self.send_response(502)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())

    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')

    def end_headers(self):
        self._send_cors_headers()
        super().end_headers()


if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = http.server.HTTPServer(('0.0.0.0', PORT), ProxyHandler)
    print(f'✅ 服务器启动: http://localhost:{PORT}')
    print(f'🤖 AI 代理: POST http://localhost:{PORT}/api/chat → {POLLINATIONS_URL}')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n👋 服务器已停止')
        server.server_close()
